import { Remedy } from './modal'

export const remedies: Remedy[] = [
  {
    id: 0,
    title: 'GOING TO THE SAUNA',
    duration: '15+',
    calendar: '3 days',
    info: 'Research shows that the heat from the sauna stimulates vasodilation — an opening of your blood vessels, which can improve oxygenation and reduce nasal inflammation. This helps make it easy to cough up the phlegm that might be causing congestion. To ease sinus infections, maintain a 10–15 minute sauna session routine for continuously 3 days. Once you have finished your sauna session, give yourself time to cool down before showering. Also, be sure to drink more fluids to replenish any possible losses from sweating and keep those',
    img: require('../../assets/images/sauna.png')
  },
  {
    id: 1,
    title: 'RINSE NASAL PASSAGES',
    duration: '5',
    calendar: '2 weeks',
    info: 'Research shows that the heat from the sauna stimulates vasodilation — an opening of your blood vessels, which can improve oxygenation and reduce nasal inflammation. This helps make it easy to cough up the phlegm that might be causing congestion. To ease sinus infections, maintain a 10–15 minute sauna session routine for continuously 3 days. Once you have finished your sauna session, give yourself time to cool down before showering. Also, be sure to drink more fluids to replenish any possible losses from sweating and keep those',
    img: require('../../assets/images/rinse.png')
  }
  // ...other remedies
]

export const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' }
    ]
  },
  {
    header: 'Help',
    items: [
      { id: 'bug', icon: 'flag', label: 'Report Bug', type: 'link' },
      { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' }
    ]
  },
  {
    header: 'Account',
    items: [{ id: 'logout', icon: 'log-out', label: 'Logout', type: 'link' }]
  }
]

export const dataSymptom = [
  { label: 'Headache', value: 'headache' },
  { label: 'Nausea', value: 'nausea' },
  { label: 'Fatigue', value: 'fatigue' }
  // ... other symptoms
]

export const dataFrequency = [
  { label: 'every day', value: 'everyday' },
  { label: '3 times a week', value: '3timeweek' }
  // ... other frequency
]

export const dataGender = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Rather not say', value: 'nosay' }
]

export const dataAge = Array.from({ length: 100 }, (_, i) => ({
  label: `${i + 1}`,
  value: i + 1
}))
