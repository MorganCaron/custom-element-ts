import 'nootstrap-ui'
import '../ts/Three'
import {
	Scene,
	PerspectiveCamera,
	AxesHelper
} from 'three'

class App {

	private context: Context = document.querySelector('three-context')
	public scene: Scene
	public camera: PerspectiveCamera

	constructor() {
		this.camera = new PerspectiveCamera(75, this.context.aspectRatio)
		this.camera.position.set(0.5, 0.5, 2)
		this.scene = new Scene()
		this.scene.add(this.camera)
		this.scene.add(new AxesHelper())
		this.context.renderer.render(this.scene, this.camera)
		this.context.onResizeCall(this.onResize.bind(this))
		this.update()
	}

	update() {
		this.context.renderer.render(this.scene, this.camera)
		requestAnimationFrame(this.update.bind(this))
	}

	onResize() {
		this.camera.aspect = this.context.aspectRatio
		this.camera.updateProjectionMatrix()
	}
}

window.addEventListener('load', () => {
	const app = new App()
}, false)
