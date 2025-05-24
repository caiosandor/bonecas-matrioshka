def contar_bonecas(n):
    if n == 0:
        return
    print(f"Abrindo boneca {n}")
    contar_bonecas(n - 1)

contar_bonecas(12)




