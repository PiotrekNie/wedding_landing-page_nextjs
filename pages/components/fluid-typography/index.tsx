/**
 * @desc Styled components mixin for fluid typography - https://www.youtube.com/watch?v=Wb5xDcUNq48
 * @param string minScreen - min screen width
 * @param string maxScreen - max screen width
 * @param string minFont - min font size
 * @param string maxFont - max font size
 * @return string - Template literal containing CSS
 */

export default function fluidType(
  minScreen: string,
  maxScreen: string,
  minFont: string,
  maxFont: string,
) {
  return `
  font-size: ${minFont};
      @media screen and (min-width: ${minScreen}) {
        font-size: calc(${minFont} + (${parseInt(maxFont, 10)} - ${parseInt(
    minFont,
    10,
  )}) * ((100vw - ${minScreen}) / (${parseInt(maxScreen, 10)} - ${parseInt(minScreen, 10)})));
      }
      @media screen and (min-width: ${maxScreen}) {
        font-size: ${maxFont};
      }
  `;
}
