export interface Company {
    name: string;
    pin: string;
    booth: string;
    companyLines: {
      lineNumber: number;
      majors: string[];
    }[];
  }

  export interface CompanyQueue {
    companyName: string;
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