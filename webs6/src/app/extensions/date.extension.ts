export { }

declare global {
  interface Date {
    toCustomISOString: () => string;
  }
}

Date.prototype.toCustomISOString = function(): string {
  return this.getFullYear() + '-' +
    (this.getMonth() > 9 ? this.getMonth() : '0' + (this.getMonth() + 1)) + '-' +
    (this.getDate() > 9 ? this.getDate() : '0' + this.getDate()) +
    'T' + (this.getHours() > 9 ? this.getHours() : '0' + this.getHours()) +
    ':' + (this.getUTCMinutes() > 9 ? this.getUTCMinutes() : '0' + this.getUTCMinutes());
}
