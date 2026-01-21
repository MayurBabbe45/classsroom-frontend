import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
import { API_URL } from "./constants";
import { BaseRecord } from "@refinedev/core";
import { DataProvider } from "@refinedev/core";
import { GetListParams, GetListResponse } from "@refinedev/core";

// Mock subject data
export interface Subject extends BaseRecord {
  id: string;
  courseCode: string;
  name: string;
  department: string;
  description: string;
}

const mockSubjects: Subject[] = [
  {
    id: "1",
    courseCode: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description: "Fundamentals of computer science including algorithms, data structures, and programming paradigms for beginners.",
  },
  {
    id: "2",
    courseCode: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description: "Advanced calculus concepts including integration, sequences, series, and applications of calculus in real-world problems.",
  },
  {
    id: "3",
    courseCode: "PHYS150",
    name: "General Physics",
    department: "Physics",
    description: "Core principles of physics covering mechanics, thermodynamics, waves, and electromagnetism for science majors.",
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource
  }:GetListParams):Promise<GetListResponse<TData>> => {
    if(resource!== 'subjects'){
      return { data:[] as TData[], total: 0 };
    }
    return { data: mockSubjects as TData[], total: mockSubjects.length };
  },

  getOne: async() => {throw new Error('This function is not present in mock')},

  create: async() => {throw new Error('This function is not present in mock')},
  update: async() => {throw new Error('This function is not present in mock')},
  deleteOne: async() => {throw new Error('This function is not present in mock')},

  getApiUrl: () => '',
}
