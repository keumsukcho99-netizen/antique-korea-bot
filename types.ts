export interface AppraisalFocus {
  id: string;
  label: string;
  description: string;
}

export interface AppraisalConfig {
  category: string;
  selectedFocusIds: string[];
  depth: 'standard' | 'deep' | 'academic';
  referenceNotes?: string;
  allowDigitalMuseum: boolean;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AppraisalResult {
  id: string;
  timestamp: number;
  imageUrls: string[];
  title: string;
  category: string;
  period: string;
  description: string;
  confidenceScore: number;
  // 4대 핵심 분석 데이터
  coreAnalysis: {
    sealsAndSignatures: { content: string; score: number }; // 낙관 및 수결
    historicalValue: { content: string; score: number };    // 역사적 가치
    academicVerification: { content: string; score: number }; // 학술적 검증
    materialAndStorage: { content: string; score: number };  // 보관 및 재질
  };
  analysis: {
    artifactDetails: string;
    historicalSignificance: string;
    conditionReport: string;
    culturalContext?: string;
    museumGrade?: string;
  };
  estimatedValue: {
    min: number;
    max: number;
    currency: string;
    note: string;
  };
  groundingSources?: GroundingSource[];
  isDonated?: boolean;
}

export type ViewState = 'home' | 'museum' | 'library' | 'about' | 'result';
