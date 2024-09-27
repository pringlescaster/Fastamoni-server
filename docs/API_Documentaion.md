# API Documentation

## Project Goals

The primary goal of this project is to create a donation management system that facilitates donations from users (donors) to various beneficiaries. The system aims to streamline the donation process, ensure transparency, and enhance user engagement through Email notifications.

## Key Features

- User registration and authentication
- Ability to create and manage donations
- Email notifications for donors upon successful donations
- A clean and efficient API for front-end integration

## API Overview

This document outlines the key API endpoints, their functionalities, and the expected responses.

### Base URL


### Summary

- Add query parameters (`page` and `limit`) to your GET requests to enable pagination.
- Use Mongoose's `skip()` and `limit()` methods to fetch the right slice of data.
- Return metadata such as total items and total pages in the response to help the client paginate correctly.


