import 'nootstrap-ui'
import '@custom-element-ts/three'
import { Context } from '@custom-element-ts/three'
import {
	Scene,
	PerspectiveCamera,
	ACESFilmicToneMapping,
	sRGBEncoding,
	PMREMGenerator,
	UnsignedByteType
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

class App {
	private context: Context
	public scene: Scene
	public camera: PerspectiveCamera

	constructor() {
		this.context = document.querySelector('three-context') as Context
		this.context.renderer.toneMapping = ACESFilmicToneMapping
		this.context.renderer.toneMappingExposure = 1
		this.context.renderer.outputEncoding = sRGBEncoding

		this.camera = new PerspectiveCamera(75, this.context.aspectRatio)
		this.camera.position.set(0.5, 0.5, 2)
		this.scene = new Scene()
		this.scene.add(this.camera)
		this.context.renderer.render(this.scene, this.camera)

		const controls = new OrbitControls(this.camera, this.context.renderer.domElement)
		controls.target.set(0, 0, -0.2)
		controls.update()

		const pmremGenerator = new PMREMGenerator(this.context.renderer)
		pmremGenerator.compileEquirectangularShader()

		new RGBELoader()
			.setDataType(UnsignedByteType)
			.setPath('static/textures/equirectangular/')
			.load('royal_esplanade_1k.hdr', (texture) => {
				const envMap = pmremGenerator.fromEquirectangular(texture).texture
				this.scene.background = envMap
				this.scene.environment = envMap

				texture.dispose()
				pmremGenerator.dispose()

				const loader = new GLTFLoader().setPath('static/models/gltf/DamagedHelmet/')
				loader.load('DamagedHelmet.gltf', (gltf) => {
					this.scene.add(gltf.scene)
				})
			})

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
