export class MapPosition {
	scale = $state(1.2);
	minScale = $state(1);
	maxScale = $state(5);
	initialScale = $state(1);
	initialPinchDistance = $state(0);
	x = $state(0);
	y = $state(0);
	panSpeed = $state(20);
	isDragging = $state(false);
	lastX = $state(0);
	lastY = $state(0);
	dragThreshold = 5;
	dragStartX = $state(0);
	dragStartY = $state(0);
	dragEnded = $state(false);
	hasMovedBeyondThreshold = $state(false);
	containerWidth = $state(0);
	containerHeight = $state(0);
	isTap = $state(false);
    touchStartTime = $state(0);

    private readonly TAP_THRESHOLD = 10; // pixels
    private readonly TAP_DURATION = 300; // ms
	private readonly PINCH_ZOOM_SENSITIVITY = 3;
	private readonly WHEEL_ZOOM_SENSITIVITY = 0.001;

	constructor() {
		this.scale = this.initialScale;
	}

	private isTouchEvent(event: MouseEvent | TouchEvent): boolean {
		return Boolean(
			typeof window !== 'undefined' &&
			'TouchEvent' in window &&
			event instanceof TouchEvent ||
			(event as TouchEvent).touches !== undefined
		);
	}

	private getEventCoordinates(event: MouseEvent | TouchEvent): { clientX: number; clientY: number } {
        if (this.isTouchEvent(event) && 'touches' in event && event.touches.length > 0) {
            return {
                clientX: event.touches[0].clientX,
                clientY: event.touches[0].clientY
            };
        } else if ('clientX' in event) {
            return {
                clientX: event.clientX,
                clientY: event.clientY
            };
        }
        
        // Fallback
        return {
            clientX: 0,
            clientY: 0
        };
    }

	setContainerSize(width: number, height: number) {
		this.containerWidth = width;
		this.containerHeight = height;
	}

	private getBounds() {
		// Calculate bounds based on container size and current scale
		const scaledWidth = this.containerWidth * this.scale;
		const scaledHeight = this.containerHeight * this.scale;

		// Maximum allowed movement is half the difference between scaled and original size
		const maxX = Math.max(0, (scaledWidth - this.containerWidth) / (2 * this.scale));
		const maxY = Math.max(0, (scaledHeight - this.containerHeight) / (2 * this.scale));

		return { maxX, maxY };
	}

	private constrainPosition(x: number, y: number): { x: number; y: number } {
		const { maxX, maxY } = this.getBounds();
		return {
			x: Math.max(Math.min(x, maxX), -maxX),
			y: Math.max(Math.min(y, maxY), -maxY)
		};
	}

	zoom = (event: WheelEvent) => {
		event.preventDefault();
		if (!(event.currentTarget instanceof HTMLElement)) return;

		this.scale = Math.max(
			this.minScale,
			Math.min(this.maxScale, this.scale - event.deltaY * this.WHEEL_ZOOM_SENSITIVITY)
		);

		const constrained = this.constrainPosition(this.x, this.y);
		this.x = constrained.x;
		this.y = constrained.y;
	};

	handlePinchZoom(scale: number) {
		this.scale = Math.max(this.minScale, Math.min(this.maxScale, scale));
		const constrained = this.constrainPosition(this.x, this.y);
		this.x = constrained.x;
		this.y = constrained.y;
	}

	pan(event: KeyboardEvent) {
		let newX = this.x;
		let newY = this.y;
		switch (event.key) {
			case 'ArrowLeft':
				newX += this.panSpeed;
				break;
			case 'ArrowRight':
				newX -= this.panSpeed;
				break;
			case 'ArrowUp':
				newY += this.panSpeed;
				break;
			case 'ArrowDown':
				newY -= this.panSpeed;
				break;
		}
		const constrained = this.constrainPosition(newX, newY);
		this.x = constrained.x;
		this.y = constrained.y;
	}

	startDrag = (event: MouseEvent | TouchEvent) => {
        if (!(event.currentTarget instanceof HTMLElement)) return;
        
        // Don't start drag on interactive elements
        if (
            event.target instanceof HTMLElement &&
            event.target.closest('button, a, input, dialog, [role="button"]')
        ) {
            return;
        }

        // Handle pinch gesture for touch devices
        if ('touches' in event && event.touches.length === 2) {
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            this.initialPinchDistance = Math.hypot(
                touch1.clientX - touch2.clientX,
                touch1.clientY - touch2.clientY
            );
            return;
        }

        this.touchStartTime = Date.now();
        this.isTap = true;

        this.isDragging = true;
        this.dragEnded = false;
        
        const coords = this.getEventCoordinates(event);
        
        this.lastX = coords.clientX;
        this.lastY = coords.clientY;
        this.dragStartX = coords.clientX;
        this.dragStartY = coords.clientY;
        this.hasMovedBeyondThreshold = false;
    };

	drag = (event: MouseEvent | TouchEvent) => {
        // Check if it's a mouse event with the left button released
        if (!this.isTouchEvent(event) && 'buttons' in event && event.buttons !== 1) {
            this.endDrag();
            return;
        }
        
        if (!this.isDragging || !(event.currentTarget instanceof HTMLElement)) return;

        // Handle pinch zoom for touch devices
        if ('touches' in event && event.touches.length === 2) {
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentDistance = Math.hypot(
                touch1.clientX - touch2.clientX,
                touch1.clientY - touch2.clientY
            );

            const scaleFactor = currentDistance / this.initialPinchDistance;
            const zoomDelta = (scaleFactor - 1) * this.PINCH_ZOOM_SENSITIVITY;
            const scale = this.scale * (1 + zoomDelta);

            this.handlePinchZoom(scale);
            this.initialPinchDistance = currentDistance;
            this.isTap = false;
            return;
        }

        const coords = this.getEventCoordinates(event);
        
        const deltaX = (coords.clientX - this.lastX) / this.scale;
        const deltaY = (coords.clientY - this.lastY) / this.scale;

        const distanceFromStart = Math.hypot(coords.clientX - this.dragStartX, coords.clientY - this.dragStartY);

        // Use a variable threshold that's higher for Safari
        const effectiveThreshold = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) 
            ? this.dragThreshold * 1.5 
            : this.dragThreshold;

        if (distanceFromStart > effectiveThreshold) {
            this.hasMovedBeyondThreshold = true;
            this.isTap = false;
        }

        if (this.hasMovedBeyondThreshold) {
            const newPosition = this.constrainPosition(this.x + deltaX, this.y + deltaY);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        this.lastX = coords.clientX;
        this.lastY = coords.clientY;
    };

	endDrag = () => {
        const wasTap = this.isTap && 
                      (Date.now() - this.touchStartTime) < this.TAP_DURATION && 
                      !this.hasMovedBeyondThreshold;
        
        if (wasTap) {
            this.isDragging = false;
            this.dragEnded = false;
        } else {
            this.isDragging = false;
            this.hasMovedBeyondThreshold = false;
            this.dragEnded = true;
            
            setTimeout(() => {
                this.dragEnded = false;
            }, 100);
        }
        
        this.isTap = false;
    };
}
