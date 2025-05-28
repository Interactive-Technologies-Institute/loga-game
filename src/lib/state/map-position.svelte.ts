export class MapPosition {
	scale = $state(1.2);
	minScale = $state(1);
	maxScale = $state(5);
	initialScale = $state(window.innerWidth < 768 ? 1 : 1.2);
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

	private readonly PINCH_ZOOM_SENSITIVITY = 40;
	private readonly WHEEL_ZOOM_SENSITIVITY = 0.001;

	constructor() {
		this.scale = this.initialScale;
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
		if (
			event.target instanceof HTMLElement &&
			event.target.closest('button, a, input, dialog, [role="button"]')
		) {
			return;
		}

		if (event instanceof TouchEvent && event.touches.length === 2) {
			// Handle pinch gesture
			const touch1 = event.touches[0];
			const touch2 = event.touches[1];
			this.initialPinchDistance = Math.hypot(
				touch1.clientX - touch2.clientX,
				touch1.clientY - touch2.clientY
			);
			return;
		}
		this.isDragging = true;
		this.dragEnded = false;
		const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
		const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

		this.isDragging = true;
		this.lastX = clientX;
		this.lastY = clientY;
		this.dragStartX = clientX;
		this.dragStartY = clientY;
		this.hasMovedBeyondThreshold = false;
	};

	drag = (event: MouseEvent | TouchEvent) => {
		if (!this.isDragging || !(event.currentTarget instanceof HTMLElement)) return;

		if (event instanceof TouchEvent && event.touches.length === 2) {
			const touch1 = event.touches[0];
			const touch2 = event.touches[1];
			const currentDistance = Math.hypot(
				touch1.clientX - touch2.clientX,
				touch1.clientY - touch2.clientY
			);

			// Modified scale calculation for more responsive zooming
			const scaleFactor = currentDistance / this.initialPinchDistance;
			const zoomDelta = (scaleFactor - 1) * this.PINCH_ZOOM_SENSITIVITY;
			const scale = this.scale * (1 + zoomDelta);

			this.handlePinchZoom(scale);
			this.initialPinchDistance = currentDistance;
			return;
		}
		if (!this.isDragging) return;

		const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
		const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

		const deltaX = (clientX - this.lastX) / this.scale; // Scale delta by zoom level
		const deltaY = (clientY - this.lastY) / this.scale;

		const distanceFromStart = Math.hypot(clientX - this.dragStartX, clientY - this.dragStartY);

		if (distanceFromStart > this.dragThreshold) {
			this.hasMovedBeyondThreshold = true;
		}

		if (this.hasMovedBeyondThreshold) {
			const newPosition = this.constrainPosition(this.x + deltaX, this.y + deltaY);
			this.x = newPosition.x;
			this.y = newPosition.y;
		}

		this.lastX = clientX;
		this.lastY = clientY;
	};

	endDrag() {
		this.isDragging = false;
		this.hasMovedBeyondThreshold = false;
		this.dragEnded = true;
		setTimeout(() => {
			this.dragEnded = false;
		}, 0);
	}
}
