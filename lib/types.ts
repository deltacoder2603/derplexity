export interface WebSource {
    uri: string;
    title: string;
  }
  
  export interface TextSegment {
    startIndex: number;
    endIndex: number;
    text: string;
  }
  

  export interface WebSourceWithSnippet {
    title: string;
    url: string;
    snippet: string;
  }
  
  export interface SearchResponse {
    sessionId: string;
    summary: string;
    sources: WebSourceWithSnippet[];
  }
  export interface Source {
    title: string;
    url: string;
    snippet: string;
  }