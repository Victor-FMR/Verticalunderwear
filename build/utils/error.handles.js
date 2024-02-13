export const handlesHttp = (res, error) => {
    res.status(500).json({ message: error });
};
