export interface Jobs {
  id: string;
  role: string;
  company_name: string;
  company_num_employees: string;
  employment_type: string;
  location: string;
  remote: boolean;
  logo: string;
  url: string;
  text: string;
  date_posted: string | Date;
  keywords: string[];
  source: string;
}
