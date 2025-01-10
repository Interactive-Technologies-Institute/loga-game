export class MapPosition {
	scale = $state(1);
	x = $state(0);
	y = $state(0);
	panSpeed = $state(20);

	zoom(event: WheelEvent) {
		event.preventDefault();
		const zoomSensitivity = 0.001;
		this.scale = Math.max(1, Math.min(5, this.scale - event.deltaY * zoomSensitivity));
	}

	pan(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowLeft':
				this.x += this.panSpeed;
				break;
			case 'ArrowRight':
				this.x -= this.panSpeed;
				break;
			case 'ArrowUp':
				this.y += this.panSpeed;
				break;
			case 'ArrowDown':
				this.y -= this.panSpeed;
				break;
		}
	}
}
