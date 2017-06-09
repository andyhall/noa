'use strict';

var shadowDist
var shadowOffset

module.exports = function (noa, dist, offset) {

	shadowDist = dist
	shadowOffset = offset

    // create a mesh to re-use for shadows
	var scene = noa.rendering.getScene()
    var disc = BABYLON.Mesh.CreateDisc('shadowMesh', 0.75, 30, scene)
    disc.rotation.x = Math.PI / 2
    disc.material = noa.rendering.makeStandardMaterial('shadowMat')
    disc.material.diffuseColor = BABYLON.Color3.Black()
    disc.material.specularColor = BABYLON.Color3.Black()
    disc.material.alpha = 0.5
	disc.setEnabled(false)


	return {

		name: 'shadow',

		state: {
			mesh: null,
			size: 0.5
		},


		onAdd: function (eid, state) {
			state.mesh = noa.rendering.makeMeshInstance(disc, false)
		},


		onRemove: function (eid, state) {
			state.mesh.dispose()
		},


		system: function shadowSystem(dt, states) {
			var dist = shadowDist
			var offset = shadowOffset
			for (var i = 0; i < states.length; i++) {
				var state = states[i]
				updateShadowHeight(state.__id, state.mesh, state.size, dist, offset, noa)
			}
		},


		renderSystem: function (dt, states) {
			// before render adjust shadow x/z to render positions
			for (var i = 0; i < states.length; ++i) {
				var state = states[i]
				var rpos = noa.ents.getPositionData(state.__id).renderPosition
				var spos = state.mesh.position
				spos.x = rpos[0]
				spos.z = rpos[2]
			}
		}




	}
}

var down = new Float32Array([0, -1, 0])

function updateShadowHeight(id, mesh, size, shadowDist, shadowOffset, noa) {
	var ents = noa.entities
	var dat = ents.getPositionData(id)
	var loc = dat.position
	var b = ents.getPhysicsBody(id)
	var y, dist
	// set to entity position if entity standing on ground
	if (b.resting[1] < 0) {
		y = dat.renderPosition[1]
	} else {
		var pick = noa.pick(loc, down, shadowDist)
		if (pick) y = pick.position[1]
	}
	if (y !== undefined) {
		mesh.position.y = y + shadowOffset
		var dist = loc[1] - y
		var scale = size * 0.7 * (1 - dist / shadowDist)
		mesh.scaling.copyFromFloats(scale, scale, scale)
		mesh.setEnabled(true)
	} else {
		mesh.setEnabled(false)
	}
}


