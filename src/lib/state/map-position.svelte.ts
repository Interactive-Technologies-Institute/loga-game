export class MapPosition {
	scale = $state(1.2);
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

	zoom(event: WheelEvent) {
		event.preventDefault();
		const zoomSensitivity = 0.001;
		this.scale = Math.max(1, Math.min(5, this.scale - event.deltaY * zoomSensitivity));

		// Adjust position after zoom to maintain constraints
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

	startDrag(event: MouseEvent | TouchEvent) {
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
	}

	drag(event: MouseEvent | TouchEvent) {
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
	}

	endDrag() {
		this.isDragging = false;
		this.hasMovedBeyondThreshold = false;
		this.dragEnded = true;
		setTimeout(() => {
			this.dragEnded = false;
		}, 0);
	}
}
