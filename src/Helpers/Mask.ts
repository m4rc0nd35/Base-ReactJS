export class Mask {
    static phone = (n: string) => {
        if (n.length > 10)
            return n.replace(/(\d{2})(\d{5})(\d{4})?/, '($1) $2-$3');
        else
            return n.replace(/(\d{2})(\d{4})(\d{4})?/, '($1) $2-$3');
    }
}