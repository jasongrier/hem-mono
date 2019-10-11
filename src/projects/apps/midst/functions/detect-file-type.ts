function detectFileType(fileData) {
  /**
   * if it has a file header that contains a fileParser field
   * – use that parser (2020 files and beyond)
   * else if the prop that holds the timeline is called "editorTimelineFrames"
   * – it's 2019
   * else if the prop that holds the timeline is called "stack"
   * it's 2018
   * else
   * throw
   */
}
