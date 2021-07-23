public function photo()
    {
        $data = request('imgBase64');
        $donnée = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data));
        file_put_contents('C:\chodev\www\smqdcpWeb_v1\storage\app\public\img.png', $donnée);
      	//Storage::disk('public')->put("img.png", $donnée);
        return $donnée;
    }