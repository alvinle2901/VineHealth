export type Remedy = {
  id: number,
  title: string
  duration: string
  calendar: string
  info: string
  img: any
}

export type Feedback = {
  comment: string
  symptom: string
  title: string
  timeCreated: number
  uid: string
}

export type UserData = {
  name: string
  phoneNumber: string
  photoURL: string
  email: string
}