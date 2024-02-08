class DateLogic {
    getDateNowToISO(): string {
        return new Date(Date.now()).toISOString();
    }

    convertDaysToMilliseconds(days: number): number {
        return days * 24 * 60 * 60 * 1000;
    }
}

export default new DateLogic();
