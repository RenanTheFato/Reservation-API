enum Status {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
  INTERDICTED = "INTERDICTED",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface Room {
  id: string,
  name: string,
  description: string,
  location: string,
  status: Status,
  createdAt: Date,
  updatedAt: Date,
}