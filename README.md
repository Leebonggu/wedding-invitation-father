# Wedding invitation

## images convert

```sh
for file in *.jpg; do
  [ -e "$file" ] || continue
  cwebp "$file" -q 80 -o "${file%.*}.webp"
done
```