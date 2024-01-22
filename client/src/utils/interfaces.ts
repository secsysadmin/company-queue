export interface Company {
  name: string;
  pin: string;
  booth: string;
}

export enum Major {
  AERO = "Aerospace Engineering",
  AREN = "Architectural Engineering",
  BAEN = "Biological and Agricultural Engineering",
  BMEN = "Biomedical Engineering",
  CHEN = "Chemical Engineering",
  CPSC = "Computer Science",
  CPEN = "Computer Engineering",
  CVEN = "Civil Engineering",
  DAEN = "Data Engineering",
  ELEN = "Electrical Engineering",
  ESET = "Electronic Systems Engineering Technology",
  EVEN = "Environmental Engineering",
  IDIS = "Industrial Distribution",
  ISEN = "Industrial and Systems Engineering",
  MEEN = "Mechanical Engineering",
  MMET = "Manufacturing and Mechanical Engineering Technology",
  MSEN = "Materials Science and Engineering",
  MXET = "Multidisciplinary Technology",
  NUEN = "Nuclear Engineering",
  OCEN = "Ocean Engineering",
  PETE = "Petroleum Engineering",
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
