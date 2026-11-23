const DEMO_PHOTOS = [
  {
    "file": "demo/1.webp",
    "tag": "paysage",
    "width": 1800,
    "height": 1200
  },
  {
    "file": "demo/2.webp",
    "tag": "paysage",
    "width": 1800,
    "height": 1200
  },
  {
    "file": "demo/3.webp",
    "tag": "mariage",
    "width": 1800,
    "height": 2700
  },
  {
    "file": "demo/4.webp",
    "tag": "architecture",
    "width": 1800,
    "height": 2700
  },
  {
    "file": "demo/5.webp",
    "tag": "architecture",
    "width": 1800,
    "height": 2520
  },
  {
    "file": "demo/6.webp",
    "tag": "nature",
    "width": 1800,
    "height": 2615
  },
  {
    "file": "demo/7.webp",
    "tag": "nature",
    "width": 1800,
    "height": 1200
  },
  {
    "file": "demo/8.webp",
    "tag": "architecture",
    "width": 1800,
    "height": 1013
  },
  {
    "file": "demo/9.webp",
    "tag": "architecture",
    "width": 1800,
    "height": 1200
  },
  {
    "file": "demo/10.webp",
    "tag": "architecture",
    "width": 1800,
    "height": 1200
  },
  {
    "file": "demo/11.webp",
    "tag": "astrophotographie",
    "width": 1800,
    "height": 1198
  },
  {
    "file": "demo/12.webp",
    "tag": "astrophotographie",
    "width": 1800,
    "height": 1308
  }
]

export function useDemoPhotos() {
  const baseURL = useRuntimeConfig().app.baseURL
  return DEMO_PHOTOS.map(photo => ({
    name: photo.file,
    filePath: photo.file,
    tags: [photo.tag],
    width: photo.width,
    height: photo.height,
    url: baseURL + photo.file,
  }))
}
