export type Remedy = {
  id: number,
  title: string
  duration: string
  calendar: string
  info: string
  img: any
  symptom: string
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
  age: string
  gender: string
  frequency: string
  symptom: string
  streak: any
  remedies: any
}