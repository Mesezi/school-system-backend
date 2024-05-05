export const removeKeys = (doc:any, keysToRemove: String[]) => {
    // Get all keys of the object
    const obj = doc.toObject();
    const allKeys = Object.keys(obj);
    
    // Filter out keys that are not in keysToRemove array
    const filteredKeys = allKeys.filter(key => !keysToRemove.includes(key));
    
    // Use reduce to create a new object without the filtered keys
    const newObj = filteredKeys.reduce((acc:any, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
    
    return newObj;
  }