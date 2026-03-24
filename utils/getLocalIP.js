exports.getLocal = async () => {
    try {
        const { stdout, stderr } = await execAsync(`bash hostname -I | grep -oE ${process.env.LOCAL_IP_REGEX}`);

        const result = stdout.trim();

        return result;
    } catch (err) {
        return "0.0.0.0";
    }
};
