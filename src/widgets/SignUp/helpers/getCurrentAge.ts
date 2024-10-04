import months from '@/widgets/SignUp/constants/months';

export default function (
  birthDay: number,
  birthMonthStr: string,
  birthYear: number
) {
  const birthMonth = months.indexOf(birthMonthStr);
  const today = new Date();

  let age = today.getFullYear() - birthYear;
  const monthDifference = today.getMonth() - birthMonth;
  const dayDifference = today.getDate() - birthDay;

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
