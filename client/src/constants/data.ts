import { Remedy } from './modal'

export const remedies: Remedy[] = [
  {
    id: 0,
    title: 'GOING TO THE SAUNA',
    duration: '15+',
    calendar: '3 days',
    info: 'Research shows that the heat from the sauna stimulates vasodilation — an opening of your blood vessels, which can improve oxygenation and reduce nasal inflammation. This helps make it easy to cough up the phlegm that might be causing congestion. To ease sinus infections, maintain a 10–15 minute sauna session routine for continuously 3 days. Once you have finished your sauna session, give yourself time to cool down before showering. Also, be sure to drink more fluids to replenish any possible losses from sweating and keep those',
    img: require('../../assets/images/sauna.png'),
    symptom: 'Sinusitis'
  },
  {
    id: 1,
    title: 'RINSE NASAL PASSAGES',
    duration: '5',
    calendar: '2 weeks',
    info: 'Research shows that the heat from the sauna stimulates vasodilation — an opening of your blood vessels, which can improve oxygenation and reduce nasal inflammation. This helps make it easy to cough up the phlegm that might be causing congestion. To ease sinus infections, maintain a 10–15 minute sauna session routine for continuously 3 days. Once you have finished your sauna session, give yourself time to cool down before showering. Also, be sure to drink more fluids to replenish any possible losses from sweating and keep those',
    img: require('../../assets/images/rinse.png'),
    symptom: 'Sinusitis'
  }
  // ...other remedies
]

export const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      {
        id: 'language',
        icon: require('../../assets/icons/language.png'),
        label: 'Language',
        type: 'select'
      },
      {
        id: 'darkMode',
        icon: require('../../assets/icons/moon.png'),
        label: 'Dark Mode',
        type: 'toggle'
      }
    ]
  },
  {
    header: 'Help',
    items: [
      {
        id: 'bug',
        icon: require('../../assets/icons/flag.png'),
        label: 'Report Bug',
        type: 'link'
      },
      {
        id: 'contact',
        icon: require('../../assets/icons/mail.png'),
        label: 'Contact Us',
        type: 'link'
      }
    ]
  },
  {
    header: 'Account',
    items: [
      {
        id: 'logout',
        icon: require('../../assets/icons/logout.png'),
        label: 'Logout',
        type: 'link'
      }
    ]
  }
]

export const dataSymptom = [
  { label: 'Headache', value: 'Headache' },
  { label: 'Nausea', value: 'Nausea' },
  { label: 'Fatigue', value: 'Fatigue' },
  { label: 'Sinusitis', value: 'Sinusitis' }
  // ... other symptoms
]

export const dataFrequency = [
  { label: 'Everyday', value: 'Everyday' },
  { label: '3 times a week', value: '3 times a week' }
  // ... other frequency
]

export const dataGender = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Rather not say', value: 'Prefer not to say' }
]

export const dataAge = Array.from({ length: 100 }, (_, i) => ({
  label: `${i + 1}`,
  value: i + 1
}))
