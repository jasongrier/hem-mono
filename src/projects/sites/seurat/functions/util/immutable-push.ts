function immutablePush<T>(subject: T[], object: T): T[] {
  const updatedSubject = [...subject]
  updatedSubject.push(object)
  return updatedSubject
}

export default immutablePush
