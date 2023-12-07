export interface Company {
    name: string;
    pin: string;
    booth: string;
  }

  export interface CompanyQueue {
    _id: string;
    companyName: string;
    companyID: string;
    companyBooth: string;
    lineNumber: number;
    majors: string[];
    studentsInLine: {
      phoneNumber: number;
      major: string;
      ticketNumber: string;
      index: number;
      contacted: boolean;
    }[];
  }

