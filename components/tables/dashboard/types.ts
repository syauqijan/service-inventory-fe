// types.ts
export interface DataRow {
    id: number;
    name: string;
    testCasePassed: number;
    testCaseFailed: number;
    coverageStatement: number;
    coverageBranch: number;
    coverageFunction: number;
    coverageLines: number;
}

export interface DataRowSonarqube {
    id: number;
    name: string;
    qualityGateStatus: string;
    bugs: string;
    vulnerabilities: string;
    codesmell: string;
    coverage: string;
    duplication: string;
}