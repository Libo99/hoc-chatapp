export class DateService {
  /*format result: DD-MM-YY, HH-MM
    examples:
     DK: 23.02.22, 22.31,
     EN: 02/23/22, 10.31 pm 
     */
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
