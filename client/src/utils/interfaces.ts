export interface Company {
  name: string;
  pin: string;
  booth: string;
}

export enum Major {
  CPSC = "Computer Science",
  CPEN = "Computer Engineering",
  MEEN = "Mechanical Engineering",
  MMET = "Manufacturing and Mechanical Engineering Technology",
  MXET = "Multidisciplinary Technology",
  ELEN = "Electrical Engineering",
  CVEN = "Civil Engineering",
  CHEN = "Chemical Engineering",
  AERO = "Aerospace Engineering",
  BMEN = "Biomedical Engineering",
  PETE = "Petroleum Engineering",
  NUEN = "Nuclear Engineering",
  OCEN = "Ocean Engineering",
  MSEN = "Materials Science and Engineering",
  IDIS = "Industrial Distribution",
  ISEN = "Industrial and Systems Engineering",
  EVEN = "Environmental Engineering",
  AREN = "Architectural Engineering",
  MISC = "Other",
}

export interface StudentInLine {
  name: string;
  phoneNumber: number;
  major: Major;
  ticketNumber: string;
  joinedAt: Date;
  notifiedAt: Date;
}

export interface Queue {
  _id: string;
  companyName: string;
  companyID: string;
  lineNumber: number;
  majors: Major[];
  studentsInLine: StudentInLine[];
}
