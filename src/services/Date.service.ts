export class DateService {
  public static formatDate = (date: Date) => {
    let fullDate: string;
    const dateString = new Date(date).toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const timeString = new Date(date).toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
    });

    fullDate = `${dateString}, ${timeString}`;

    return fullDate;
  };

  public static getNewDate = () => {
    return new Date().getTime();
  };
}
