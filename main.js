let net;
let capture;
let le;
let re;
let mask;

async function preload() {
	net = await posenet.load({
		architecture: 'MobileNetV1',
		outputStride: 16,
		inputResolution: { width: 280, height: 160 },
		multiplier: 0.50
	});
	mask = loadImage("./sunglasses.png");
}

function setup() {
	createCanvas(640, 480);
	capture = createCapture(VIDEO);
	capture.size(160, 120);
	capture.hide();
	nose = null;
	setInterval(update, 1 / 30);
}

function draw() {
	push();
	translate(width, 0);
	scale(-1, 1);
	image(capture, 0, 0, width, height);
	pop();
	if (le && re) {
		push();
		const w = (1.3 * (re.x - le.x)) + 80;
		translate(le.x - 45, le.y - w * 0.32);
		const vec = createVector(re.x - le.x, re.y - le.y);
		translate(50, 50);
		rotate(vec.heading());
		translate(-50, -50);
		image(mask, 0, 0, w, w * 0.7);
		pop();
	}
}

async function getPose(image) {
	const pose = await net.estimateSinglePose(image.elt, {
		flipHorizontal: true
	});
	return pose;
}

async function update() {
	if (!net)
		return;
	const pose = await getPose(capture);
	le = pose.keypoints.find(a => a.part === "leftEye").position;
	re = pose.keypoints.find(a => a.part === "rightEye").position;
	le.x *= 4;
	le.y *= 4;
	re.x *= 4;
	re.y *= 4;
}