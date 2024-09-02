export const textToBool = (text: string): boolean | undefined => {
  switch (text.toLowerCase()) {
    case '是':
    case 'yes':
    case 'y':
      return true;
    case '否':
    case 'not':
    case 'no':
    case 'none':
    case 'null':
    case 'n':
      return false;
    default:
      return undefined;
  }
};
