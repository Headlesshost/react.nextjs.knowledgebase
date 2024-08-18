export function dateToYMD(dateStr: string | undefined) {
  if (!dateStr) return "";
  var date = new Date(dateStr);

  var strArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var d = date.getDate();
  var m = strArray[date.getMonth()];
  var y = date.getFullYear();
  return `${m} ${d <= 9 ? "0" + d : d}, ${y}`;
}

export function trimCenter(inputString: string, maxLength: number) {
  if (!inputString) return "";
  // Ensure the input string is longer than the desired maximum length
  if (inputString.length <= maxLength) {
    return inputString;
  }

  // Calculate the length of the start and end portions
  const startLength = Math.ceil((maxLength - 1) / 2); // Ensure it's an integer
  const endLength = Math.floor((maxLength - 1) / 2);

  // Extract the start and end portions of the string
  const startPortion = inputString.substring(0, startLength);
  const endPortion = inputString.substring(inputString.length - endLength);

  // Concatenate the start and end portions with an ellipsis in the center
  const resultString = startPortion + endPortion;

  return resultString;
}
