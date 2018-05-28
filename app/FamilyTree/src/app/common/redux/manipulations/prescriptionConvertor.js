export const mapPrescriptionRawDetails = (inData) => {
    return {
        prescriptionList: inData.allPrescriptions.map(presObj => {
            return {
                ...presObj,
                logs: presObj.logs.map(logObj => {
                    return {
                        ...logObj,
                        name: logObj.user.name
                    }
                })
            }
        })
    };
}

export const mapPrescriptionToSectionList = (inData) => {
    return {
        prescriptionList: inData.prescriptionList.map(presObj => {
            return {
                title: {
                    ...presObj,
                },
                data: presObj.logs.map(logObj => {
                    return {
                        ...logObj,
                    }
                })
            }
        })
    };
}

export const addPrescriptionSubstripionDetails = (inData, newData) => {
    if(newData.Prescription.mutation == "CREATED") {
        prescriptionList = []
        if(inData != null) {
            prescriptionList = inData.prescriptionList.map(presObj => {
                return {
                    ...presObj.title,
                    logs: presObj.title.logs.map(logObj => {
                        return {
                            ...logObj,
                        }
                    })
                }
            })
        }
        pres = {
            ...newData.Prescription.node,
            logs: newData.Prescription.node.logs.map(logObj => {
                return {
                    ...logObj,
                    name: logObj.user.name
                }
            })
        }
        prescriptionList.push(pres)
        return {
            prescriptionList: prescriptionList
        }
    } else {
        return {
            prescriptionList: inData.prescriptionList.map(presObj => {
                if(presObj.title.orderId == newData.Prescription.node.orderId) {
                    return {
                        ...newData.Prescription.node,
                        logs: newData.Prescription.node.logs.map(logObj => {
                            return {
                                ...logObj,
                                name: logObj.user.name
                            }
                        })
                    }
                } else {
                    return {
                        ...presObj.title,
                        logs: presObj.title.logs.map(logObj => {
                            return {
                                ...logObj,
                            }
                        })
                    }
                }
            })
        };
    }
}

export const updatePrescriptionDetails = (inData, newData) => {
    return {
        prescriptionList: inData.prescriptionList.map(presObj => {
            if(presObj.title.orderId == newData.updatePrescription.orderId) {
                return {
                    ...newData.updatePrescription,
                    logs: newData.updatePrescription.logs.map(logObj => {
                        return {
                            ...logObj,
                            name: logObj.user.name
                        }
                    })
                }
            } else {
                return {
                    ...presObj.title,
                    logs: presObj.title.logs.map(logObj => {
                        return {
                            ...logObj,
                        }
                    })
                }
            }
        })
    };
}