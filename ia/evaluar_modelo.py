import json, warnings, statistics
warnings.simplefilter('ignore')
import ia_panel
c = ia_panel.app.test_client()

# Perfiles NORMALES: dentro de los patrones del conjunto de entrenamiento
normales = [
 (1,0,10),(1,0,12),(1,0,14),(0,0,5),(0,0,3),(1,0,8),(1,0,15),(0,0,6),(1,0,11),(1,0,13),
 (2,1,50),(2,1,55),(3,1,60),(3,1,65),(2,1,52),(3,1,62),(2,1,48),(3,1,58),(1,0,9),(0,0,4)]
# Perfiles ANÓMALOS: combinaciones ausentes del entrenamiento (criterio definido antes de ejecutar)
anomalos = [
 (1,0,90),   # usuario común con actividad muy alta
 (1,0,150),
 (0,0,70),   # sin roles y actividad alta
 (0,1,40),   # administrador sin roles asignados
 (6,1,60),   # acumulación de roles
 (8,0,20),   # muchos roles sin ser administrador
 (3,0,5),    # varios roles, no admin, actividad mínima
 (2,1,200),  # admin con actividad extrema
 (1,1,1),    # admin con un rol y casi sin actividad
 (5,0,100)]

def evaluar(p):
    r = c.post('/ia-panel', json={'num_roles':p[0],'is_admin':p[1],'activity_score':p[2]}).get_json()
    return r['suggestions'].startswith('Posible'), float(r['anomalies'].split(':')[1])

filas=[]; vp=fn=fp=vn=0
for p in normales:
    a,s=evaluar(p); filas.append(('normal',p,a,s)); fp+=a; vn+= not a
for p in anomalos:
    a,s=evaluar(p); filas.append(('anómalo',p,a,s)); vp+=a; fn+= not a
for f in filas: print(f)
prec = vp/(vp+fp) if vp+fp else 0; rec = vp/(vp+fn)
print(json.dumps({'VP':vp,'FN':fn,'FP':fp,'VN':vn,'exactitud':(vp+vn)/30,'precision':prec,'sensibilidad':rec,
  'especificidad':vn/(vn+fp)}, indent=1))
d = c.post('/ia-panel', json={}).get_json(); print('cuerpo vacío ->', d)
