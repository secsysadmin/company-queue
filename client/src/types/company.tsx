export interface Company {
  name: string;
  booth: string;
  companyLines: {
    lineNumber: number;
    majors: string[];
  }[];
}
