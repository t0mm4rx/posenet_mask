function setup() {
	createCanvas(1000, 800);
}

function draw() {
	background(0);

	noFill();
	stroke(255);
	for (let x = 0; x < width; x += 50) {
		for (let y = 0; y < height; y += 50) {
			const a = x * 0.003 + mouseX / width * 0.5;
			const b = y * 0.003 + mouseY / width * 0.5;
			const vector = p5.Vector.fromAngle(noise(a, b) * 2 * PI);
			vector.mult(20);
			line(x + 25, y + 25, x + 25 + vector.x, y + 25 + vector.y);
			line(x + 25, y + 25, x + 25 - vector.x, y + 25 - vector.y);
		}
	}
}