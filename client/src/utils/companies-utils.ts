export default class CompaniesUtils {
  public static transformToOptionsForm(data: any[]) {
    return data.map((item) => {
      return { label: item.name, value: item.name };
    });
  }

  public static formatInputSpecialities = (e: any) => {
    return e !== null
      ? e.map((item: any) => {
          return item.value;
        })
      : null;
  };

  public static formatInputCities = (e: any) => {
    return e !== null ? e.value : null;
  };
}
