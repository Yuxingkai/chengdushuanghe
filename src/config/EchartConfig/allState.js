export const option = {
  backgroundColor: 'none',
  globe: {
    backgroundColor: 'none',
    globe: {
      baseTexture: 'data-gl/asset/earth.jpg',
      // heightTexture: 'data-gl/asset/bathymetry_bw_composite_4k.jpg',
      displacementScale: 1,
      shading: 'lambert',
      light: {
        ambient: {
          intensity: 0.4
        },
        main: {
          intensity: 0.4
        }
      },
      layers: [{
        type: 'blend',
        blendTo: 'emission',
        texture: 'data-gl/asset/night.jpg'
      }, {
        type: 'overlay',
        texture: 'data-gl/asset/clouds.png',
        shading: 'lambert',
        distance: 5
      }]
    },
    series: []
  }
}
