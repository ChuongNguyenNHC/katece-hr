import { HopDongSXRepository, CreateContractInput } from "./hopdongsx.repository";

export class HopDongSXService {
    private readonly repository: HopDongSXRepository;

    constructor(repository: HopDongSXRepository) {
        this.repository = repository;
    }

    async createContract(data: CreateContractInput) {
        // Validation logic
        if (!data.tenHopDongSX) throw new Error("Tên hợp đồng là bắt buộc.");
        if (!data.ngayBatDau || !data.ngayKetThuc) throw new Error("Thời hạn hợp đồng là bắt buộc.");
        if (!data.items || data.items.length === 0) throw new Error("Hợp đồng phải có ít nhất một sản phẩm.");

        return await this.repository.create(data);
    }

    async getAllContracts() {
        return await this.repository.findAll();
    }
}
