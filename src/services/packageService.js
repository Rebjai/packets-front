import api from "./API";

export default {
  create(pkg) {
    api.post("/api/send-package", pkg);
  },
  async getAllPackages() {
    const packages = await api.get("/api/send-package");
    console.log("all packages: ", packages);

    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get("/api/send-package");
        const data = res.data;
        resolve(data.map( pkg=>({ ...pkg,
        createdAt: new Date(pkg.createdAt)})))
        console.log("all packages: ", packages);
      } catch (error) {}
    });
  }
};
