export function validateSessionAndTerm(session:string, term:string) {
    // Define regex for session format
    const sessionRegex = /^\d{4}-\d{4}$/;

    // Validate session format
    if (!sessionRegex.test(session)) {
        return "Invalid session format. It should be in the format YYYY-YYYY (e.g., 2023-2024).";
    }

    // Define valid terms
    const validTerms = ["1st", "2nd", "3rd"];

    // Validate term
    if (!validTerms.includes(term)) {
        return `Invalid term: ${term}. Term must be one of the following: ${validTerms.join(", ")}.`;
    }

    // If both validations pass, return null
    return null;
}