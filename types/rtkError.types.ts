interface RTKError {
    data: {
        error: string;
    };
    status: number;
}


export function isRTKError(error: unknown): error is RTKError {
    return (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as any).data.error === "string"
    );
}
