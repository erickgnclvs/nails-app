# Nails App 💅

![Nails App](https://img.shields.io/badge/Status-In%20Development-brightgreen)

A mobile app connecting nail technicians with customers. Built with React Native and Expo.

## Features

### For Customers
- **Browse Nail Technicians**: Discover nail techs based on rating, location, and specialties
- **Search Functionality**: Find technicians by name or services offered
- **Booking System**: Easy appointment scheduling with preferred nail technicians
- **Payment Processing**: Secure mock payment system
- **Favorites**: Save your preferred nail technicians for future bookings
- **Inspiration Gallery**: Browse trending nail styles and designs

### For Technicians (In Development)
- **Appointment Management**: Calendar view of all bookings
- **Client Management**: View and manage client information
- **Portfolio Management**: Showcase your best work
- **Business Analytics**: Understand your performance and growth

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet
- **Data**: Mock data (simulated API responses)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/erickgnclvs/nails-app.git
   cd nails-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

## Project Structure

- **/app**: Main application code
  - **(customer)**: Customer-facing screens
  - **(tech)**: Technician-facing screens
- **/components**: Reusable UI components
- **/constants**: App constants including colors and theme settings
- **/data**: Mock data to simulate backend responses

## Screens

### Customer Flow
- Home - Featured nail techs and trending styles
- Search - Find technicians based on various criteria
- Tech Profile - View technician details, portfolio and services
- Booking - Schedule appointments with selected technician
- Payment - Process payments for booked services
- Appointments - Manage existing bookings

### Tech Flow (In Development)
- Dashboard - Overview of appointments and earnings
- Appointments - Manage client bookings
- Portfolio - Manage displayed work examples
- Settings - Account and profile settings

## Contributing

This project is currently under active development. Contributions, ideas, and feedback are welcome!

## License

This project is licensed under the MIT License.
