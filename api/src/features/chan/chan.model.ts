export interface Chan {
  page: number
  threads: Thread[]
}

export interface Thread {
  capcode: string
  closed: number
  com: string
  ext: string
  filename: string
  fsize: number
  h: number
  images: number
  last_modified: number
  last_replies: {
    capcode: string
    ext: string
    filename: string
    fsize: number
    h: number
    md5: string
    name: string
    no: number
    now: string
    resto: number
    tim: number
    time: number
    tn_h: number
    tn_w: number
    w: number
  }[]
  md5: string
  name: string
  no: number
  now: string
  omitted_images: number
  omitted_posts: number
  replies: number
  resto: number
  semantic_url: string
  sticky: number
  tim: number
  time: number
  tn_h: number
  tn_w: number
  w: number
}
