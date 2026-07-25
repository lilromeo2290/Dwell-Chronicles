#!/bin/bash
OUTDIR="/home/z/my-project/public"

urls=(
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/ACgIswOWRxSil-AseSsK3H4/2b0a1862-62f3-4736-8d14-be37b45f6c3a.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AFA3jmhyt0KCY1tJeOnuBUY/2e1a1abd-72af-490c-b319-186784bdfa39.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AA6o_K0aPnCCNiGN7gPX0DM/8e62c519-246c-4b05-b327-73223f63cbaf.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AHDA7e3XREgi08Uv-ukBsb0/9b403a7b-998a-42fa-9e91-b0fad6b7dcef.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AEiyBsb0_1oyCuAEt6nGWH4/9c08c83a-9fd2-47fd-bd39-c3a49461e3b4.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AHmaKW24n2AytdOk1orR9jk/78af3f72-c1c2-430d-a0df-969f0959d072.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AHr90cDDJTexhW36q6xI8T0/85e39ac6-dbed-49eb-b612-781b4418f06e.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AI4ja5tOzTeQwTPHW_HNoAw/502ee8cc-382f-4954-816b-4741073c9ae5.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/ADf1o3e9WB6Inpee0-32a3U/4688582d-247b-449e-b6de-ac595509d4a6.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AP87Oxnt7B6Q4EwEn07vwC8/40552445-f6a3-4f4a-bb27-926955d1b929.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AM_Zq_3FcOJTtZzi6thS-Ks/cfcb595a-96b3-4b9d-bd61-8847762a0d8b.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AC-sPXwkRoWFiYCNjdmQbdQ/ed9cbf89-b981-4da8-ac53-6376274de49e.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
"https://www.dropbox.com/scl/fo/hbxui5mtranbms66uw0g9/AF3FpU0vf1Y0umsSJDLhhvo/ee943de9-1ce9-4c0b-adae-5635d52d3207.jpg?rlkey=hvvdqe09eca0pt39pd6h278lt&dl=1"
)

names=("p2-1" "p2-2" "p2-3" "p2-4" "p2-5" "p2-6" "p2-7" "p2-8" "p2-9" "p2-10" "p2-11" "p2-12")

for i in "${!urls[@]}"; do
  echo "Downloading ${names[$i]}.jpg..."
  curl -sL -o "$OUTDIR/${names[$i]}.jpg" "${urls[$i]}"
  echo "  Done: $(stat -c%s $OUTDIR/${names[$i]}.jpg) bytes"
done
echo "All downloads complete!"
