export interface NoteRequest {
    id?: number;
    value: number;
    studentId: number;
    subjectId: number;
}

export interface NoteQueryParams {
    studentId?: number;
    subjectId?: number;
    page?: number;
}